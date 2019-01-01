-- Q5
--del1(E,[E|R],R).
--del1(E,[H|T],[H|R]) :-
--   del1(E,T,R).

del1 :: Eq t => t -> [t] -> [t]
del1 e [] = []
del1 e (h:t)
  | e == h = del1 e t
  | otherwise = h : del1 e t

delall :: Eq t => t -> [t] -> [[t]]
delall _ [] = []
delall e (h:t)
  | e == h = t:[h:l | l <- delall e t]
  | otherwise = [h:l | l <- delall e t]

-- `Prolog program can take a list and give you output based on all possible e values`

--  Haskell can use higher order functions to give a more generalised del function which can be
--  used in other functions.

shuffle :: [t] -> [t] -> [[t]]
shuffle l1 [] = [l1]
shuffle [] l2 = [l2]
shuffle (h1:t1) (h2:t2) =
  [h1 : e | e <- shuffle t1 (h2:t2)] ++ [h2 : e | e <- shuffle (h1:t1) t2]
