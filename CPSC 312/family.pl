% Simple Database about a family
% CPSC 312 2018, in public domain
% To load in Prolog,
%?- [family].

% father(X, Y) means X is the father of Y
father(pierre, justin).
father(pierre, alexandre).
father(pierre, michel).
father(justin, xavier).
father(justin, ella_grace).

% mother(X, Y) means X is the mother of Y
mother(margaret, justin).
mother(margaret, alexandre).
mother(margaret, michel).
mother(sophie, xavier).
mother(sophie, ella_grace).

% parent(X,Y) means X is a parent of Y
parent(X,Y) :- mother(X,Y).
parent(X,Y) :- father(X,Y).

sib(A,B) :-
    parent(X,A),
    parent(X,B).

% grandmother(GP,C) means GP is a grandparent of C
grandmother(X,Z) :- mother(X,Y), parent(Y,Z).

% sibling(X,Y) means X is a sibling of Y
sibling(X,Y) :- parent(Z,X), parent(Z,Y), different(X,Y).

% different(A,B) means A is a different person than B
different(xavier,ella_grace).
different(ella_grace,justin).

% ancestor(X,Y) means X is an ancestor of Y
ancestor(X,Y) :- parent(X,Y).
ancestor(X,Y) :- parent(X,Z), ancestor(Z,Y).


% Some example queries:
% father(justin, xavier).
% mother(grace, pierre).
% father(justin, pierre).
% mother(M,justin).
% mother(M,pierre).
% father(pierre,C).
% parent(P,justin).
% parent(pierre,C).
% parent(X,Y).
% grandmother(GM,xavier).
% father(pierre,Y), parent(Y,Z).
% parent(X,Y), parent(Y,xavier).
% ancestor(X,xavier).
% ancestor(margaret,C).
