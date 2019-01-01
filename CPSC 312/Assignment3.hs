--Author Mariusz Grebelski 46406344

module Assignment3 where
--(a)

splitsep :: (a -> Bool) -> [a] -> ([[a]], [a])

splitsep f [] = ([[]], [])
splitsep f lst =  foldl (\ (a,b) y -> if f (head y) then (b:a, []) else (a, ((head y):b) )) ([[]],[]) lst

--(b)

readingfile filename =
  do
    putStr("Input file name: ")
    file <- readFile filename
    file2 <- splitsep (=='\n') file
    return splitsep (==',') file2
