Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "683" in the students list
When I try to register the student "Mari" with CPF "683"
Then I can see "Mari" with CPF "683" in the students list


Feature: As a professor
         I want to remove students
         So that I can manage the student list completely

Scenario: Removing registered student by CPF
Given I am at the students page
Given I can see a student with CPF "683" in the students list
When I click on remove on the student with CPF "683"
Then I can no longer see a stundent with CPF "683" in the students list