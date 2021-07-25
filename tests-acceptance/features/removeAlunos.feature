Feature: As a professor
         I want to remove students
         So that I can manage the student list completely

Scenario: Removing registered student by CPF
Given I am at the students page
Given I can see a student with CPF "688" in the students list
When I click on remove on the student with CPF "688"
Then I can no longer see a student with CPF "688" in the students list