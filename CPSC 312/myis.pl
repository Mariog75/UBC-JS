% CPSC 312 - simple "is" definition in Prolog
% Copyright (c) David Poole 2017. This program
% is released under GPL, version 3 or later; see http://www.gnu.org/licenses/gpl.html

% myis(N,E) is true if expression E evaluates to number N
myis(N,N) :- number(N).
myis(N,A+B) :-
    myis(NA,A),
    myis(NB,B),
    N is NA+NB.
myis(N,A*B) :-
    myis(NA,A),
    myis(NB,B),
    N is NA*NB.
myis(0,zero).
myis(1,one).
myis(2,two).
myis(3,three).

%?- myis(X, 3*(two+7)+10).

:- op(700, xfx, myis).

%?- X myis 33*three.
%?- 33*three myis 33*three.
%?- X myis +(7,11).
%?- X myis 7+11.
%?- myis(X, +(*(3,+(two,7)),10)).
%?- X myis 3*(two+7) + 10.
