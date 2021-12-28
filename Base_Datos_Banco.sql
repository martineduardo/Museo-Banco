drop database banco;
create database banco;
use banco;

create table Sucursal(
	id_Sucursal int auto_increment not null,
    nombre varchar(50) not null,
    ubicacion varchar(50) not null,
    primary key (id_Sucursal)
);

/*create table Cliente(
	RFC varchar(13) not null,
    Nombre_p varchar(20) not null,
    Apellido_p varchar(10) not null,
    Apellido_m varchar(20) not null,
    NumTelefonico varchar(10) not null,
    NumCuenta varchar(10) not null,
    primary key (RFC),
    foreign key (NumCuenta) references Cuenta(NumCuenta)
);*/

create table Cuenta(
	numCuenta int auto_increment not null,
    nombre_p varchar(20) not null,
    apellido_p varchar(10) not null,
    apellido_m varchar(20) not null,
    numTelefonico varchar(10) not null,
    id_Sucursal int not null,
    primary key (numCuenta),
    foreign key (id_Sucursal) references Sucursal(id_Sucursal)
);

create table Tarjeta(
	numTarjeta varchar(16) unique not null,
    saldo double not null,
    numCuenta int not null,
    primary key (numTarjeta),
    foreign key (numCuenta)references Cuenta(numCuenta)
);

create table Transaccion(
	id_Transaccion int auto_increment not null,
    fecha datetime not null,
    monto double not null,
    tarjetaOrigen varchar(16) not null,
    tarjetaDestino varchar(16) not null,
    estado bool default false,
    primary key (id_Transaccion),
    foreign key (Tarjetaorigen) references Tarjeta(numTarjeta)
);

create table Prestamo(
	id_Prestamo int auto_increment not null,
    nombre varbinary(50) not null,
    importe double not null,
    motivo varchar(100) not null,
    numCuenta int not null,
    primary key (id_Prestamo),
    foreign key (numCuenta) references Cuenta(numCuenta)
);

create table Pago(
	id_Pago int auto_increment not null,
    fecha_pago datetime not null,
    importe double not null,
    id_Prestamo int not null,
    primary key (id_Pago),
    foreign key (id_Prestamo) references Prestamo(id_Prestamo)
);

insert into Sucursal (nombre,ubicacion) values('Centro', 'Felicitas Zermeño');
insert into Sucursal (nombre,ubicacion) values('Norte', 'CDA. Puruñuela');

insert into Cuenta (nombre_p, apellido_p, apellido_m, numTelefonico, id_Sucursal) values ('Luis Jorge', 'Barcelo', 'Navarro', '6621572501', 1);
insert into Cuenta (nombre_p, apellido_p, apellido_m, numTelefonico, id_Sucursal) values ('Martin Eduardo', 'Amavizca', 'Gonzalez', '6341090898', 1);
insert into Cuenta (nombre_p, apellido_p, apellido_m, numTelefonico, id_Sucursal) values ('Luis Marcos', 'Rascon', 'Soto', '6624473145', 1);


insert into Tarjeta (numTarjeta, saldo, numCuenta) values('4152313868721916', 1000.00, 1);
insert into Tarjeta (numTarjeta, saldo, numCuenta) values('4152313853153836', 1000.00, 2);
insert into Tarjeta (numTarjeta, saldo, numCuenta) values('5204165457812794', 1000.00, 3);

SELECT * FROM Transaccion;

UPDATE Transaccion SET estado = true WHERE id_Transaccion=0;
delete from Transaccion where id_Transaccion = 4;
delete from Transaccion where id_Transaccion = 5;
delete from Transaccion where id_Transaccion = 6;
delete from Transaccion where id_Transaccion = 7;