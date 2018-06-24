var request: any = require('request-promise');
var cheerio: any = require('cheerio');
var url: any  = require('url-parse');
import {fabricaDeApostas} from '../fabricaDeApostas';

describe('The list of probabilities', () => {

    var options = {
        uri: 'http://romers.com.br/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    var crawler = new fabricaDeApostas();

    it('should have 14 games', () => {
        return request(options)
            .then($ => {
                let probabilidadess = crawler.crawlProbabilidades($);
                expect(probabilidades.length).toBe(14);
            })
            .catch(e => {
                expect(e).toBe(null);
            });
    });

    it('should have 3 probabilities', () => {
        return request(options)
            .then($ => {
                let probabilidades = crawler.crawlProbabilidades($);
                let vitoriaMandante, vitoriaVisitante, empate;
                for(let i = 0; i < probabilidades.length; i++) {
                    expect(probabilidades[i].vitoriaMandante).toMatch(/[\d]*%/);
                    expect(probabilidades[i].vitoriaVisitante).toMatch(/[\d]*%/);
                    expect(probabilidades[i].empate).toMatch(/[\d]*%/);
                }
            })
            .catch(e => {
                expect(e).toBe(null);
            });
    });

});