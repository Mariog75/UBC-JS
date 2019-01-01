:- dynamic bird/0, emu/0, penguin/0, onplane/0, planebroken/0.
bird:-penguin.
bird:-emu.
cantfly:-penguin.
cantfly:-emu.
flies:-bird, \+ cantfly.
flies:-onplane, \+ planebroken.


next_hour(pm(H,M),pm(H1,M)):-
  H > 0,
  H < 11,
  H1 is H+1.
next_hour(am(H,M),am(H1,M)):-
  H > 0,
  H < 11,
  H1 is H+1.
next_hour(am(11,M),pm(12,M)).
next_hour(am(12,M),am(1,M)).
next_hour(pm(12,M),pm(1,M)).

del1(E,[E|T],T).
del1(E,[H|T],[H|R]):-
  del1(E,T,R).
