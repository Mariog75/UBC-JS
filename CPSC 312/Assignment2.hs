--Author -> Mariusz Grebelski 46406344
--Partner -> Ofir Talmor

module Assignment2 where

-- Q1 (a)
tails [] = [[]]
tails (e:r) = (e:r):tails(r)

--(i) [a] -> [[a]]
--(ii) ["happy","appy","ppy","py","y",""]
--(iii) [[Char]]
--(iv)
tails1 :: [a] -> [[a]]
tails1 = foldr ( \ x y -> (x : (head y)) : y) [[]]

--Q1 (b)

doif f g [] = []
doif f g (h:t)
 | f h = g h : doif f g t
 | otherwise = h : doif f g t

--(i)(a -> Bool) -> (a -> a) -> [a] -> [a]

toUpper :: Char -> Char
toUpper x = toEnum( fromEnum x - fromEnum 'a' + fromEnum 'A')

capvowel str = doif ( \ x -> elem x ['a','e','i','o','u']) toUpper str

doif1 f g lst = [if f x then g x else x | x <- lst]

doif2 f g lst = foldr ( \ x y -> if f x then (g x):y else x:y) [] lst

--Q2

myremoveduplicates = foldr ( \ x y -> (x : (filter (/= x) y))) []

myordered [] = True
myordered lst = foldr (\a f b -> (a >= b) && f a) (const True) (tail lst) (head lst)

myreplace a b = map (\x -> if (a == x) then b else x)

harmonic n = foldr ( \ x y -> x + y/n)

--Q3

--Q1 -> 1 hr -> I found this question challenging as it is a different way of thinking
-- about problems than in other programming languages

--Q2 -> 4 hr -> I struggled without using recursion for this question
