import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task3.html',
  styleUrls: ['./app.css']
})
export class App {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = true;
  errorMessage = '';

  rows: Row[] = [];
  expandedIds = new Set<string>();
  selectedIds = new Set<string>();

  visibleRows: VisibleRow[] = [];

  get selectedIdsText(): string {
    return Array.from(this.selectedIds).join(', ') || '-';
  }

  trackById(_: number, item: VisibleRow) {
    return item.row.id;
  }

  async ngOnInit() {
    console.log('ngOnInit started');
    try {
      console.log('Making HTTP request...');
      const data = await firstValueFrom(
        this.http.get<{ rows: Row[] }>('./assets/rows.json')
      );
      console.log('Received data:', data);
      this.rows = data?.rows ?? [];
      console.log('Set rows:', this.rows);
      this.rebuildVisibleRows();
      console.log('Visible rows:', this.visibleRows);
    } catch (err: any) {
      console.error('Error loading rows.json:', err);
      this.errorMessage = 'Failed to load rows.json';
    } finally {
      console.log('Setting loading to false');
      this.loading = false;
      this.cdr.detectChanges(); // Force UI update
    }
  }

  hasChildren(row: Row) {
    return (row.children?.length ?? 0) > 0;
  }

  toggleExpand(row: Row) {
    if (!this.hasChildren(row)) return;
    if (this.expandedIds.has(row.id)) this.expandedIds.delete(row.id);
    else this.expandedIds.add(row.id);
    this.rebuildVisibleRows();
  }

  toggleSelect(id: string) {
    if (this.selectedIds.has(id)) this.selectedIds.delete(id);
    else this.selectedIds.add(id);
  }

  onToggleExpand(row: Row, event: MouseEvent) {
    event.stopPropagation(); // prevent selecting when expanding
    this.toggleExpand(row);
  }

  private rebuildVisibleRows() {
    const result: VisibleRow[] = [];

    const walk = (items: Row[], level: number) => {
      for (const r of items) {
        result.push({ row: r, level });
        if (this.expandedIds.has(r.id) && this.hasChildren(r)) {
          walk(r.children, level + 1);
        }
      }
    };

    walk(this.rows, 0);
    this.visibleRows = result;
  }
}

type Row = {
  id: string;
  text1: string;
  text2: string;
  children: Row[];
};

type VisibleRow = {
  row: Row;
  level: number;
};
