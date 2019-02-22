service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}


            "styles": [
              "./src/styles.css",
              "node_modules/chartist/dist/chartist.css",
              "node_modules/quill/dist/quill.snow.css",
              "node_modules/quill/dist/quill.bubble.css",
              "node_modules/angular-calendar/css/angular-calendar.css",
              "node_modules/dragula/dist/dragula.css",
              "node_modules/perfect-scrollbar/css/perfect-scrollbar.css",
              "node_modules/@swimlane/ngx-datatable/release/index.css",
              "node_modules/@swimlane/ngx-datatable/release/themes/material.css",
              "node_modules/@swimlane/ngx-datatable/release/assets/icons.css",
              "src/assets/styles/style.scss"
            ],