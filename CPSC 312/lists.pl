% CPSC 312 - List Code
% Copyright D Poole 2018, Released under CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/


% list(L) is true if L is a list
list([]).
list([_|T]) :-
    list(T).

%?- list([a,b,c]).
%?- list([a,[b,c]]).
%?- list(foo(a,[b,c])).
%?- list(cons(a,[b,c])).

% member(X,L) is true if X is an element of list L
member(X,[X|_]).
member(X,[_|R]) :-
    member(X,R).

%?- member(a, [a,b,c]).
%?- member(b,[a,[b,c]]).
%?- member(X,[a,[b,c]]).
%?- member(X,[a|[b,c]]).
%?- member(val(b,V),[val(aa,3), val(b,7), val(dd,23)]).

% append(A,B,C) is true if C contains the elements of A followed by the elements of B
append([],L,L).
append([H|T],L,[H|R]) :-
    append(T,L,R).

%?- append([1,2,3],[a,b,c],R).
%?- append(L1, L2, [a,b,c]).
%?- append(Before, [jul|After], [jan,feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]).
%?- append(_, [M1,jul,M2|_], [jan,feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]).


% numeq(X,L,N) is true if N is the number of instances of X in L.
numeq(_,[],0).
numeq(X,[X|R],N1) :-
    numeq(X,R,N),
    N1 is N+1.
numeq(X,[H|T],N) :-
    dif(X,H),
    numeq(X,T,N).

%?- numeq(a,[a,b,b,a,s],N).
%?- numeq(X,[a,b,b,a,s],2).
%?- numeq(X,[a,b,b,a,s],1).
%?- numeq(X,[a,b,b,a,s],0).
%?- numeq(a,[a,b,X,Y],2).

% sum(L,S) is true if S is the sum of the elements of numerical list L
sum([],0).
sum([H|T],S) :-
    sum(T,ST),
    S is H+ST.

%?- sum([2,3,4,5],S).
%?- sum([2,3,X,5],14).    % gives an error

% suma(L,S) is true if S is the sum of the elements of numerical list L
suma(L,S) :-
    sum3(L,0,S).

% sum3(L,A,S) is true if S is A plus the sum of the elements of L
sum3([],A,A).
sum3([H|T],A,S) :-
    A1 is A+H,
    sum3(T,A1,S).

%?- suma([2,3,4,5],S).


% reverse(L,R) true if R has same elements as L, in reverse order
reverse([H|T],R) :-
    reverse(T,TR),
    append(TR,[H],R).

%?- reverse([1,3,5,7,9],R).
%?- reverse(R,[1,3,5,7,9]).

% reverse2(L,R) true if R has same elements as L, in reverse order
reverse2(L,R) :-
    reverse3(L,[],R).

% reverse3(L,A,R) is true if R consists of the elements of L reversed followed by the elements of A
reverse3([],R,R).
reverse3([H|T],Acc,R) :-
    reverse3(T,[H|Acc],R).

%?- reverse2([1,3,5,7,9],R).
%?- reverse2(R,[1,3,5,7,9]).

%?- reverse3([1,2,3],L,R).
%?- reverse3([1,2,3],L,R), reverse3([7,8,9],S,L).

%?- append([a,b,c],R,L).
%?- append([a,b,c],R,L), append([1,2,3],S,R).
