import {Component} from '@angular/core';
import {Tutorial} from "../../models/tutorial.model";
import {TutorialService} from "../../services/tutorial.service";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrl: './add-tutorial.component.css'
})
export class AddTutorialComponent {
  tutorial: Tutorial = new Tutorial();
  submitted = false;

  constructor(private tutorialService: TutorialService) {
  }

  saveTutorial(): void {
    this.tutorialService.create(this.tutorial).then(() => {
      console.log("Created new tutorial successfully!");
      this.submitted = true;
    })
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }
}
