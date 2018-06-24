import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

// Cadastrar apostadores.

@Injectable()
export class ApostadorService {

    private acURL: String = 'http://localhost:3000';
    private headers = new Headers({'Content-Type': 'application/json'});

    public constructor(private http: Http) {}

    getApostas(): any {
        return this.http.get(this.acURL + "/apostas")
        .toPromise()     
        .then(res => res.json() as Aposta[])
        .catch(e => console.log('Erro de acesso: ' + e));
    }

    getAcumulo(): any {
        return this.http.get(this.acURL + "/acumulo")
        .toPromise()     
        .then(res => res.text())
        .catch(e => console.log('Erro de acesso: ' + e));
    }

    getProbabilidades(): any {
        return this.http.get(this.acURL + "/probabilidades")
        .toPromise()
        .then(res => res.json() as Probabilidade[])
        .catch(e => console.log('Erro de acesso: ' + e));
    }
}