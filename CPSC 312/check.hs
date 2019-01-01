module Check where
foo :: Int -> Int
foo x = x+3

dfoo x = foo (foo x)

nfoo x = x+3+3

fooeach [] = []
fooeach (h:t) = foo h : t

nfooeach [] = []
nfooeach (h:t) = nfoo h : t

iffoo [] = []
iffoo (h:t)
 | h < 4.3 = h:t
 | otherwise = t

dd x y = 2*x + 3*y + 7

