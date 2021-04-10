-- Customers
use `h1gtfw3uuuyktywj`;
insert into `customers` (`name`, `address`, `email`, `phone`, `password`) values 
('anonymous', 'Street', 'email@email.com', '5555555555', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC'),
('Rutvik Patel', '482 Kindle Rd, DeKalb, IL, 60115', 'rutvik503@gmail.com', '2248069761', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC'),
('Hardik Patel', '389 Boty Circle APT 1, Hoffman Estates, IL, 60169', 'hardikpatel123@gmail.com', '8476738923', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC'),
('Kavan Patel', '5729 Anibleed Rd, Elgin, IL, 60120', 'kvn195@gmail.com', '2249021100', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC');

-- Employees/Workers
insert into `workers` (`password`, `name`, `is_admin`, `pay_rate`, `department`, `email`) values
('$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC', 'Noah Rix', 1, 30.70, 'Operations', 'nrix@gmail.com'),
('$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC', 'James Smith', 0, 14.50, 'Loading Dock', 'jsmith@gmail.com'),
('$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC', 'Jennifer Doe', 0, 17.95, 'Packing', 'jdoe@gmail.com');

-- Shipping information
insert into `shipping_information` (`type`, `cost`) values 
('Free', 0),
('Economy', 5.99),
('Premium', 9.99),
('Industrial', 99.99),
('Commercial', 499.99);

-- Orders
insert into `orders` (
    `order_shipped`, 
    `order_confirmed`, 
    `payment_info`, 
    `tax_amount`, 
    `shipping_handling_price`, 
    `billing_address`, 
    `shipping_address`, 
    `timestamp`, 
    `customer_id`, 
    `worker_id`, 
    `total_price`, 
    `total_items`) values
(0, 0, 'blah', 8.25, 5.99, '430 russell rd apt 5', '430 russell rd apt 5', '2021-03-29 00:21:05', 1, 1, 493.94, 5),
(1, 1, 'blah', 7.10, 9.99, '307 sutherland ln', '307 sutherland ln', '2021-02-14 17:15:25', 2, 1, 294.23, 3),
(0, 1, 'blah', 8.99, 10.49, '431 russell rd apt 6', '431 russell rd apt 6', '2021-01-26 08:36:50', 3, 1, 483.97, 7),
(1, 1, 'Paid by credit card ending in 3945', 7.25, 5.99, '430 russell rd apt 5', '430 russell rd apt 5', '2021-04-03 00:03:05', 1, 1, 857.44, 54);

-- Order Items
insert into `order_items` (`order_id`, `part_id`, `quantity`) values 
(1, 1, 1),
(1, 2, 2),
(1, 3, 5),
(1, 4, 37),
(2, 106, 3),
(2, 107, 9),
(2, 108, 10),
(3, 145, 1),
(3, 146, 2),
(3, 147, 7),
(3, 148, 16),
(3, 149, 168);