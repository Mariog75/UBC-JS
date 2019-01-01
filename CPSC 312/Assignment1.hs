--Author Mariusz Grebelski 46406344
--Partner Ofir Talmor

--Q1 a

module Assignment1 where
harmonic 1 = 1.0
harmonic n = harmonic ((fromIntegral n)-1) + (1 / fromIntegral(n))

--Q1 b
-- It works when you use the fromIntegral function to cast it to a more general number


--Q2
-- (Eq a, Eq t, Num a, Num p, Num t) => p -> t -> a -> p
-- Takes in probability(p), team1 wins(x1) and team2 wins(x2) and computes
-- probability of winning best out of 5 series
bestOf5 p x1 3 = 0
bestOf5 p 3 x2 = 1
bestOf5 p x1 x2 = p * (bestOf5 p (x1+1) x2) + (1-p) * (bestOf5 p x1 (x2+1))

-- (Eq a, Eq t, Num a, Num p, Num t) => p -> t -> a -> p
-- Takes in probability(p), team1 wins(x1) and team2 wins(x2) and computes
-- probability of winning best out of 7 series
bestOf7 p x1 4 = 0
bestOf7 p 4 x2 = 1
bestOf7 p x1 x2 = p * (bestOf7 p (x1+1) x2) + (1-p) * (bestOf7 p x1 (x2+1))

--(Integral a, Num p) => p -> a -> a -> a -> p
-- Takes in probability(p), team1 wins(x1), team2 wins(x2) and number of
-- games(n) and computes probability of winning best out of 7 series
bestOf7case p x1 x2 n
 |x2 > (div n 2) = 0
 |x1 > (div n 2) = 1
 |otherwise = p * (bestOf7case p (x1 + 1) x2 n) + (1 - p) * (bestOf7case p x1 (x2 + 1) n)

--Q3
-- (a) dfoo :: Int -> Int
-- (b) nfoo :: Num a => a -> a
-- (c) fooeach :: [Int] -> [Int]
-- (d) nfooeach :: Num a => [a] -> [a]
-- (e) iffoo :: (Ord a, Fractional a) => [a] -> [a]
-- (f) dd :: Num a => a -> a -> a

--Q4 a
myreplace _ _ [] = []
myreplace x y (h:t)
 | h==x = y : myreplace x y t
 | otherwise = h : myreplace x y t

myordered [] = True
myordered (h:t)
 | (length t) == 0 = True
 | h <= (head t) = myordered t
 | otherwise = False

myapply [] (h:t) = []
myapply (h:t) [] = (h:t)
myapply (h:t) (x:y)
 | h == fst x = snd x : myapply t y
 | otherwise = h : myapply t y

myremoveduplicates [] = []
myremoveduplicates (h:t) = h : myremoveduplicates (filter (/= h) t)

deln n e [] = []
deln 0 e (h:t) = (h:t)
deln n e (h:t)
 | h == e = deln (n-1) e t
 | otherwise = h : deln n e t

delna n e [] = []
delna 0 e (h:t) = [(h:t)]
delna n e (h:t)
 | h == e = [h : x | x <- (delna n e t)] ++ delna (n-1) e t

-- Q5

-- Q1 -> 1 hrs -> I had to learn how Haskell works and try fix my code to work for the specified query
-- Q2 -> 1.5 hrs -> I spent quite a while understanding how the probability works and how to represent that in Haskell
-- Q3 -> 0.5 hrs -> I learned how the implied types work for different functions
-- Q4 -> 3 hrs -> This challenged me to work recursively as opposed to using loops.
