Feature: busca por apostas na Loteca
As a gambler, 
I want to get the currently running bets,
so that I can see what I can bet.

Scenario: ordenar crescentemente a lista por data dos jogos
Given I'm at "Concurso" page
Given "BRASIL" versus "COSTA RICA" is on the list of bets
Given "BRASIL" versus "COSTA RICA" will happen "SEXTA-FEIRA"
Given "BÉLGICA" versus "TUNÍSIA" is on the list of bets 
Given "BÉLGICA" versus "TUNÍSIA" will happen "SÁBADO"
When I sort the list by date
Then I see "BRASIL" versus "COSTA RICA" before "BÉLGICA" versus "TUNÍSIA" on the list

Scenario: alerta de acúmulo de aposta
Given I'm at "Concurso" page	
Given The prize has accumulated for more than R$ "1000000"
When I see the estimated prize section
Then I see an "ACUMULADO!" alert
