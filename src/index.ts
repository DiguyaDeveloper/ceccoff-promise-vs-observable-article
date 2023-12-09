import * as fs from "fs/promises";
import { Observable, interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

buildObservable();
buildPromise();

function buildObservable(): void {
  const counterObservable: Observable<number> = interval(1000).pipe(take(5));

  const subscription: Subscription = counterObservable.subscribe({
    next: (count) => console.log("Contagem:", count),
    error: (error) => console.error("Erro:", error),
    complete: () => console.log("Contador concluído"),
  });

  // Cancelar a subscrição após 5 segundos
  setTimeout(() => subscription.unsubscribe(), 5000);
}

function buildPromise(): void {
  const readFileAsync = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8")
        .then((data) => resolve(data))
        .catch((error) => reject("Erro ao ler o arquivo: " + error.message));
    });
  };

  readFileAsync("./assets/arquivo.txt")
    .then((content) => console.log("Conteúdo do arquivo:", content))
    .catch((error) => console.error("Erro:", error));
}
