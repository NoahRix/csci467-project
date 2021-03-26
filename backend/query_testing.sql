use `h1gtfw3uuuyktywj`;
insert into `inventory` values
(150, 0),
(151, 0),
(152, 0),
(153, 0),
(154, 0),
(155, 0),
(156, 0),
(157, 0),
(158, 0);

use `h1gtfw3uuuyktywj`;
delete from `inventory`

use `h1gtfw3uuuyktywj`;
select * from `inventory`;

use `h1gtfw3uuuyktywj`;
delete from `inventory` where `part_id` in (150, 151, 152, 153, 154, 155);

use `h1gtfw3uuuyktywj`;
delete from `inventory` where `part_id` > 70;

SELECT BookCode, Title, CONCAT_WS(', ', AuthorLast, AuthorFirst) AS AuthorName, Price 
FROM Book INNER JOIN Wrote 
USING (BookCode) JOIN Author 
USING (AuthorNum) 
WHERE Title = 'Black House' AND Sequence = 1;