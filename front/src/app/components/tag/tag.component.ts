import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { SysTag } from 'src/app/models/graph';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedTagsList } from 'src/app/stats/tag.actions';
import { selectTags } from 'src/app/stats/tag.selectors';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  items: MenuItem[] = [];

  tags: string = ""
  tags$ = this.store.select(selectTags);

  constructor(
    private messageService: MessageService,
    private graphsService: GraphService,
    private store: Store
  ) {
    this.tags$.subscribe(_tags => {
      if (!_tags) {
        return
      }
      this.tags = JSON.stringify(_tags, null, 2)
    })
  }

  ngOnInit(): void {
    let tags = this.graphsService.getAllTags()
    this.store.dispatch(retrievedTagsList({ tags }))
  }

  onFileStyleDropped(event: any): void {
    this.messageService.add({
      severity: 'info', summary: 'Upload', detail: `Filename ${event[0].name}`
    });
    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      let data: any = JSON.parse(reader.result + "");
      this.graphsService.saveTags(data)
      this.store.dispatch(retrievedTagsList({ tags: data }))
    });
    reader.readAsText(event[0])
  }
}
