create schema News collate utf8mb3_general_ci;

use News;

create table Post
(
    id    int auto_increment,
    title varchar(200) not null,
    text  text         not null,
    image varchar(100) null,
    date  datetime default NOW() null,
    constraint Post_pk
        primary key (id)
);

create table Comment
(
    id      int auto_increment,
    post_id int         not null,
    author  varchar(50) null,
    text    text        not null,
    constraint Comment_pk
        unique (id),
    constraint Comment_Post_id_fk
        foreign key (post_id) references Post (id)
            on update cascade on delete cascade
);

INSERT INTO Post (id, title, text, image) VALUES (1, 'test' , 'description for test post', null);
INSERT INTO Post (id, title, text, image) VALUES (2, 'test 2' , 'description for test post 2', null);

INSERT INTO Comment (id, post_id, author, text) VALUES (1, 1 , 'Ivanov', 'description for test comment');
INSERT INTO Comment (id, post_id, author, text) VALUES (2, 2 , 'Sidorov', 'description for test comment 2');
