%%% Prolog program for the simplified plumbing example....
% Copyright Poole and Mackworth 2016. Do not distribute.
% Mario Grebelski 46406344
%:- dynamic on_t1/0, on_t2/0, on_t3/0, on_t4/0, on_t5/0, on_t6/0,
%	   plugged_sink/0, plugged_bath/0, unplugged_sink/0, unplugged_bath/0.

pressurized(p1).
pressurized(p2) :- on(t1), pressurized(p1).
flow(shower) :- on(t2), pressurized(p2).
flow(shower) :- on(t5), pressurized(p5).

wet(bath) :- flow(shower).

% Drains
flow(d2) :- wet(bath), unplugged(bath).
flow(d1) :- flow(d2).
flow(d1) :- flow(d3).

pressurized(p3) :- pressurized(p2).
flow(cold_spout) :- on(t3), pressurized(p3).

wet(sink) :- flow(cold_spout).
wet(sink) :- flow(hot_spout).

flow(d3) :- wet(sink), unplugged(sink).


% Try some subset of:
on(t1).
on(t2).
%on_t3.
unplugged(bath).
%unplugged_sink.

% Add overflowing
wet(floor) :- wet(sink), plugged(sink).
wet(floor) :- wet(bath), plugged(bath).
%plugged_bath.
plugged(sink).


% hot-water system
% pressurized_hws means the how water system is pressurized
pressurized(hws) :- pressurized(p2), on(t4).
% p4 is the pipe coming out of the HWS to the sink spout
pressurized(p4) :- pressurized(hws).
% flow_hot_spout  is true if there is hot water fowing into the sink
flow(hot_spout) :- pressurized(p4), on(t6).
% p5 is the pipe coming out of the HWS to the shower
pressurized(p5) :- pressurized(hws).

% t4 is the tap that connects the HWS to p2
%on_t4.
% t5 is the tap from the hot water system to the shower
%on_t5.
% t6 is the hot tap at the sink
on(t6).
% Try:
%?- flow_d1.
%?- wet_floor.
% and then try to change the scenario so that wet_floor is true.
