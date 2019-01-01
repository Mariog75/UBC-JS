% CPSC 312 2018 - Prolog Code for Lists
% Copyright David Poole 2018 , Released under CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

% This file assumes that a list is either:
% empty or
% cons(H,T)

% mylist(L) is true if L is a list
mylist(nil).
mylist(cons(_,L)) :- mylist(L).


% mymember(E,L) is true if E is an element of list L
mymember(E,cons(E,_)).
mymember(E,cons(_,L)) :- mymember(E,L).

%?- mymember(X, cons(jan, cons(feb, cons(mar, nil)))).

% myappend(X,Y,Z) is true if Z is a list that contains the elememts of X followed by the elements of Y
myappend(nil,Z,Z).
myappend(cons(A,X),Y,cons(A,Z))
:- myappend(X,Y,Z).

% Some queries to try:		 
%?- myappend(cons(jan,cons(feb,nil)), cons(mar,nil), M3).

%?- myappend(cons(jan,cons(feb,nil)), cons(mar,nil), M3), myappend(A,B,M3).

%?- myappend(cons(jan,cons(feb,nil)), cons(mar,nil), M3), myappend(M3, cons(apr, cons(may, cons(jun, nil))), M6).

%?- myappend(cons(jan,cons(feb,nil)), cons(mar,nil), M3), myappend(M3, cons(apr, cons(may, cons(jun, nil))), M6), myappend(A,cons(may,B),M6).

%?- myappend(cons(jan,cons(feb,nil)), cons(mar,nil), M3), myappend(M3, cons(apr, cons(may, cons(jun, nil))), M6), myappend(A,cons(may,B),M6).
