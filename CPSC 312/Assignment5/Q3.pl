% Mario Grebelski 46406344

%(a)
lookup(X,Env,V):-
  member(val(X,V), Env).

%(b)
eval(X,Env,V):-
  lookup(X,Env,V).

eval(N, _, N):-
  number(N).

eval(X+Y,Env,V):-
  eval(X,Env,V1),
  eval(Y,Env,V2),
  V is V1+V2.

eval(X*Y,Env,V):-
  eval(X,Env,V1),
  eval(Y,Env,V2),
  V is V1*V2.
