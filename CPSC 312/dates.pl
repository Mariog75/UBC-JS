% CPSC 312 2018 - Prolog Code for Dates
% Copyright David Poole 2018

% ce(Y,M,D) is the date yeay Y, month M, day D in the common era

% born(Person,Date) is true if Person was born on Date
born(justin,ce(1994,mar,1)). 
born(pierre,ce(1919,oct,18)). 
born(ella_mai,ce(1994,nov,3)).

% before(D1, D2) is true when date D1 is before date D2
before(ce(Y0,_,_), ce(Y1,_,_)) :-
    Y0 < Y1.
before(ce(Y,M0,_), ce(Y,M1,_)) :-
    month(M0,N0),
    month(M1,N1),
    N0 < N1.
before(ce(Y,M,D0), ce(Y,M,D1)) :-
    D0 < D1.

before(bce(_,_,_), ce(_,_,_)).
before(bce(Y0,_,_), bce(Y1,_,_)) :-
    Y0 > Y1.
before(bce(Y,M0,_), bce(Y,M1,_)) :-
    month(M0,N0),
    month(M1,N1),
    N0 < N1.
before(bce(Y,M,D0), bce(Y,M,D1)) :-
    D0 < D1.


% month(M,N) is true if month M is the N'th month of the year
month(jan,1).
month(feb,2).
month(mar,3).
month(apr,4).
month(may,5).
month(jun,6).
month(jul,7).
month(aug,8).
month(sep,9).
month(oct,10).
month(nov,11).
month(dec,12).


% older(X,Y) is true if person X is older than (born before) person Y
older(X,Y) :-
    born(X, XBD),
    born(Y, YBD),
    before(XBD, YBD).

