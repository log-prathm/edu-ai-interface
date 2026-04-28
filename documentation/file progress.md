# Finish upload logic
finishUpload(file: File) => Controls the file upload logic. Like how the structure should behave after file has been uploaded.


### navigate function
function navigate(nextPage: QuizPage) {
    setPage(nextPage);
  }


types of nextPages: QuizPage => export type QuizPage = "home" | "history" | "reports" | "profile" | "quiz" | "result";
