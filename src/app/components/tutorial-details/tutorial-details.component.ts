import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Tutorial} from "../../models/tutorial.model";
import {TutorialService} from "../../services/tutorial.service";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrl: './tutorial-details.component.css'
})
export class TutorialDetailsComponent implements OnInit, OnChanges {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(private tutorialService: TutorialService) {
  }

  ngOnInit(): void {
    this.message = 'message';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = {...this.tutorial}
  }

  updatePublished(status: boolean): void {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, {published: status})
        .then(() => {
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data: Partial<Tutorial> = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };

    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = "The tutorial was updated successfully!")
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = "The tutorial was deleted successfully!"
        })
        .catch(err => console.log(err));
    }
  }
}
