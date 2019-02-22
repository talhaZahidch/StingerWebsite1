import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  newEmail?: string | null;
  newName?: string | null;
  newUsername?: string;
  newPhone?: string;

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateEmail(): void {
    this.afs.collection('employees').doc(this.data.uid).update({ email: this.newEmail });
    this.dialogRef.close();
  }

  updateName(): void {
    this.afs.collection('employees').doc(this.data.uid).update({ name: this.newName });
    this.dialogRef.close();
  }

  updateUsername(): void {
    this.afs.collection('employees').doc(this.data.uid).update({ displayName: this.newUsername });
    this.dialogRef.close();
  }

  updatePhone(): void {
    this.afs.collection('employees').doc(this.data.uid).update({ phoneNo: this.newPhone });
    this.dialogRef.close();
  }

  updateContact(): void {
    this.afs.collection('employees').doc(this.data.uid).update({ name: this.newName, phoneNo: this.newPhone });
    this.dialogRef.close();
  }
}

