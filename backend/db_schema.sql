use `h1gtfw3uuuyktywj`;

drop table if exists `inventory`, `order_items`, `orders`, `shipping_information`, `workers`, `customers`;

create table `customers`(
   `id` int auto_increment,
   `name` varchar(255),
   `address` varchar(255),
   `email` varchar(255) NOT NULL UNIQUE,
   `password` varchar(255),
   `refresh_token` varchar(255) default null,
   `phone` char(10),
   primary key(`id`)
);

create table `workers`(
    `id` int auto_increment,
    `name` varchar(255), 
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255),
    `refresh_token` varchar(255) default null,
    `is_admin` tinyint unsigned,
    `pay_rate` decimal(4, 2),
    `department` varchar(255),
    primary key(`id`)
);

create table `shipping_information`(
    `type` varchar(255) primary key,
    `cost` decimal(7,2) 
);

create table `orders`(
    `id` int auto_increment primary key,
    `timestamp` datetime,
    `order_shipped` tinyint unsigned,
    `order_confirmed` tinyint unsigned,
    `payment_info` varchar(255),
    `tax_amount` decimal (4, 2),
    `shipping_handling_price` decimal(4, 2),
    `total_price` decimal(6, 2),
    `total_items` int,
    `billing_address` varchar(255),
    `shipping_address` varchar(255),
    `customer_id` int,
    `worker_id` int,
    foreign key(`customer_id`) references `customers`(`id`) on delete cascade,
    foreign key(`worker_id`) references `workers`(`id`)
);

create table `order_items`(
    `order_id` int,
    `part_id` int,
    `quantity` int,
    primary key(`order_id`, `part_id`),
    foreign key(`order_id`) references `orders`(`id`) on delete cascade
);

create table `inventory`(
    `part_id` int primary key,
    `quantity` int
);