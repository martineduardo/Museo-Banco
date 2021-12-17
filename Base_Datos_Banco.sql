drop database banco;
create database banco;
use banco;

create table Sucursal(
	id_Sucursal int unique auto_increment not null,
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
	numCuenta varchar(10) unique not null,
    nombre_p varchar(20) not null,
    npellido_p varchar(10) not null,
    npellido_m varchar(20) not null,
    numTelefonico varchar(10) not null,
    id_Sucursal int not null,
    primary key (numCuenta),
    foreign key (id_Sucursal) references Sucursal(id_Sucursal)
);

create table Tarjeta(
	numTarjeta varchar(16) unique not null,
    saldo double not null,
    id_Sucursal int not null,
    numCuenta varchar(10) not null,
    primary key (numTarjeta),
    foreign key (numCuenta)references Cuenta(numCuenta)
);

create table Transaccion(
	id_Transaccion int unique auto_increment not null,
    fecha datetime not null,
    monto double not null,
    Tarjetaorigen varchar(16) not null,
    Tarjetadestino varchar(16) not null,
    estado bool,
    primary key (id_Transaccion),
    foreign key (Tarjetaorigen) references Tarjeta(numTarjeta)
);

create table Prestamo(
	id_Prestamo int unique auto_increment not null,
    nombre varbinary(50) not null,
    importe double not null,
    motivo varchar(100) not null,
    numCuenta varchar(10) not null,
    primary key (id_Prestamo),
    foreign key (numCuenta) references Cuenta(numCuenta)
);

create table Pago(
	id_Pago int unique auto_increment not null,
    fecha_pago datetime not null,
    importe double not null,
    id_Prestamo int not null,
    primary key (id_Pago),
    foreign key (id_Prestamo) references Prestamo(id_Prestamo)
);

insert into Sucursal values('Bancoweno', 'Muy lejos');

insert into Cuenta values ('6621572501', 'Luis Jorge', 'Barcelo', 'Navarro', '1234567890', 1);
insert into Cuenta values ('6341090898', 'Martin Eduardo', 'Amavizca', 'Gonzalez', '1234567890', 1);

insert into Tarjeta values('6969696969696969', 1000.00, 1, '6621572501');
insert into Tarjeta values('1111111111111111', 1000.00, 1, '6341090898');