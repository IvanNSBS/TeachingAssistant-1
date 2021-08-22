Feature: As a professor
         I want to delete and restore roteiros
         So i can have a better usability of the roteiros feature

Scenario: Move Roteiro to Lixeira 
	Given I am at the roteiros page
	Given I can see a roteiro with id "lixeira_teste"
	When I click on delete "lixeira_teste"
	Then I can no longer see roteiro "lixeira_teste" on the roteiro list
    Then I am still at the roteiro page

Scenario: Go to Lixeira Page
    Given I am at the roteiros page
    When I click on the Lixeira Button
    Then I am Redirected to Lixeira Page