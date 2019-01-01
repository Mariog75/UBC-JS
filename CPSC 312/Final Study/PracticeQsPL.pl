%Q1
zip([],_,[]).
zip(L,[],[]):-
  dif(L,[]).
zip([H1|T1],[H2|T2],[(H1,H2)|R]):-
  zip(T1,T2,R).

notin(_,[]).
notin(E,[H|T]):-
  notin(E,T),
  dif(E,H).

apply([],_,[]).
apply([H|T],S,[HR,R]):-
  rep(H,S,HR),
  apply(T,S,R).

rep(H,[],H).
rep(H,[sub(H,R)|_],R).
rep(H,[sub(H1,_)|S],R) :-
    dif(H,H1),
    rep(H,S,R).

appla(L,S,R):-
  atomic(L),
  rep(L,S,R).
appla((A+B),S,(AR+BR)):-
  appla(A,S,AR),
  appla(B,S,BR).
appla((A*B),S,(AR*BR)):-
  appla(A,S,AR),
  appla(B,S,BR).

deln(0,_,[],[]).
deln(N,E,[E|T],R):-
  N>0,
  N1 is N-1,
  deln(N1,E,T,R).
deln(N,E,[H1|T1],[H2|T2]):-
  deln(N,E,T1,T2).

enrolled_cs_not_math(S):-enrolled(S,C), dep(C,comp_sci), \+ enrolled_in_math(S).
enrolled_in_math(S):-enrolled(S,C1), dep(C1,math), level(C1,3).

can_enrol(X,cs304):-passed(X,cs221).
can_enrol(X,cs304):-passed(X,cs260), passed(X,ee302), passed_one(X,[cs210,ee210,ee309]).

passed_one(X,[H|_]):-
  passed(X,H).
passed_one(X,[_|T]):-
  passed_one(X,T).

%Q2
%(a) np([dog,ate,seven,grapes],R,X) and np([dog|L],L,fido)
%(b) p(X,Y,X) and p(Z,Z,c)
%(c) p(X,Y,X) and p(a,b,c)
%(d) bar(f(X),g(g(b))) and bar(W,g(Y))
%(e) foo(Z, [a,z|X],X) and foo([a,m|W],W,[i,n,g])
%(f) dl([a,b|X],X) and dl(Z,Z).

% L = [ate,seven,grapes],
% L = R,
% X = fido.

% X = Y, Y = Z, Z = c.

% X cannot be both a and c

% W = f(X)
% Y = g(b)

% X = [i,n,g],
% W = [a,z,i,n,g],
% Z = [a,m,a,z,i,n,g].

% X = Z,
% Z = [a,b|Z].

%above(X,Y) :- on(X,Z), above(Z,Y).
%above(X,Y) :- on(X,Y).
%on(a,b).
%on(b,c).
%on(c,d).
%on(e,d).
%on(d,f).

%Give a top-down derivation for the first answer that Prolog finds to
%the query:

%?- above(X,d).

% yes(X,d):- above(X,d). resolve with above(X1,Y1):- on(X1,Z1), above(Z1, Y1). sub(X/X1, Y1/d).
% yes(X1):- on(X1,Z1), above(Z1,d). resolve with on(a,b). sub(X1/a, Z1/b).
% yes(a):- above(b,d). resolve with above(X2, Y2):- on(X2,Z2), above(Z2, Y2). sub(X2/b, Y2/d).
% yes(a):- on(b,Z2), above(Z2,d). resolve with on(b,c). sub(Z2/c).
% yes(a):- above(c,d). resolve with above(X3,Y3):-on(X3,Y3). sub(X3/c, Y3/d).
% yes(a):- on(c,d). resolve with on(c,d).
% yes(a):-.
% X = a

myremoveduplicates([],[]).
myremoveduplicates([E1|R],S):-
  member(E1,R),
  myremoveduplicates(R,S).
myremoveduplicates([E1|R],[E1|S]):-
  notin(E1,R),
  myremoveduplicates(R,S).

shuffle([],[],[]).
shuffle([H|T],L,[H|R]) :- shuffle(T,L,R).
shuffle(T,[H|L],[H|R]) :- shuffle(T,L,R).


% def(F,A,FA) function F on argument A returns FA
def(sq,X,X2) :- X2 is X*X.
def(plus,X,plus(X)).
def(plus(X),Y,Z) :- Z is X+Y.
def(gt,X,gt(X)).     % gt(X) is \Y -> X>Y
def(gt(X),Y,true) :- X>Y.  % this would be (x>) in Halskell
def(gt(X),Y,false) :- X =< Y.

% eval(E,V) is true if expression E evaluates to V
% this uses square brackets as parentheses, values separated by commas
eval(N,N) :- number(N).
eval([V],V).
eval([P,A|R],V) :-
    eval(A,AV),
    def(P,AV,R1),
    eval([R1|R],V).

% eval([sq,[plus,3,7]],V).    % evaluates to 100
mapWhile(_,_,[],[]).
mapWhile(_,P,[H|_],[]) :- eval([P,H],false).
mapWhile(F,P,[H|T],[FH|R]) :-
    eval([P,H],true),
    eval([F,H],FH),
    mapWhile(F,P,T,R).


wff(A,B) :- terminal(A,Z), binop(Z,Y), wff(Y,B).
wff(A,B) :- unop(A,Z), wff(Z,B).
wff(A,B) :- terminal(A,B).

binop([&|T],T).
binop([or|T],T).
unop([not|T],T).

terminal([Term|T],T) :- term(Term).

term(p).
term(q).
term(r).

%yes(V):- wff([p,&,not,q,or,r],V).
%yes(V):- terminal([p,&,not,q,or,r],Z1), binop(Z1,Y1), wff(Y1,V).
%yes(V):- term(p), binop([&,not,q,or,r],Y1), wff(Y1, V).
%yes(V):- wff([not,q,or,r], V).
%yes(V):- unop([not,q,or,r],Z2), wff(Z2,V).
%yes(V):- wff([q,or,r],V).
%yes(V):- terminal([q,or,r],Z3), binop(Z3,Y3), wff(Y3,V).
%yes(V):- term(q), binop([or,r], Y3), wff(Y3, V).
%yes(V):- wff([r],V).
%yes(V):- terminal([r],V).
%yes([]):- term([r]).
%yes([]):-.

%Strong types help eliminate many bugs before putting policies into production.

% Developers working on policies want to be able to experiment and
% test their code interactively, and to see the results immediately.

%Prolog is better for solving logical problems
%haskel is better for implememnting computational functions
