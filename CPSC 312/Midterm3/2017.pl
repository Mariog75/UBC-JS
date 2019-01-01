%Q4

next_day(ce(Y,M,D1),ce(Y,M,D2)):-
  number_days(M,DN),
  D1 < DN,
  D2 is D1+1.

next_day(ce(Y,M1,D1),ce(Y,M2,1)):-
  number_days(M1, D1),
  M1 < 12,
  M2 is M1+1.
next_day(ce(Y1, 12, 31),ce(Y2,1,1)):-
  Y2 is Y1+1.



number_days(M,31) :- member(M,[1,3,5,7,8,10,12]).
number_days(2,28).
number_days(M,30) :- member(M,[4,6,9,11]).

replace(_,_,[],[]).
replace(Old,New,[Old|L],[New|R]):-
  replace(Old,New,L,R).
replace(Old,New,[Head|L], [Head|R]):-
  dif(Old,Head),
  replace(Old,New,L,R). 
