import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/compat/firestore";
import {Tutorial} from "../models/tutorial.model";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  tutorialsRef: AngularFirestoreCollection<Tutorial>;
  private dbPath = '/tutorials';

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }

  create(tutorial: Tutorial): Promise<DocumentReference<Tutorial>> {
    return this.tutorialsRef.add({...tutorial});
  }

  update(id: string, partialTutorial: Partial<Tutorial>): Promise<void> {
    return this.tutorialsRef.doc(id).update(partialTutorial);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
