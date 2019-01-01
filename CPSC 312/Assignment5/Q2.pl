% Mario Grebelski 46406344

before(am(H1,_), am(H2,_)) :-
  H1 < H2.

before(am(H,M1), am(H,M2)) :-
  M1 < M2.

before(pm(H1,_), pm(H2,_)) :-
  H1 < H2.

before(pm(H,M1), pm(H,M2)) :-
  M1 < M2.

before(am(_,_), pm(_,_)).
