create database banco;
use banco;
create table Sucursal(
    id_Sucursal int not null,
    Nombre varchar(50) not null,
    Ubicacion varchar(50) not null,
    primary key (id_Sucursal)
);

create table Cuenta(
    NumCuenta varchar(10) not null,
    Saldo double not null,
    id_Sucursal int not null,
    primary key (NumCuenta),
    foreign key (id_Sucursal)references Sucursal(id_Sucursal)
);

create table Cliente(
    RFC varchar(13) not null,
    Nombre_p varchar(20) not null,
    Apellido_p varchar(10) not null,
    Apellido_m varchar(20) not null,
    NumTelefonico varchar(10) not null,
    NumCuenta varchar(10) not null,
    primary key (RFC),
    foreign key (NumCuenta) references Cuenta(NumCuenta)
);

create table Transaccion(
    id_Transaccion int not null,
    Fecha datetime not null,
    Monto double not null,
    NumCuenta varchar(10) not null,
    primary key (id_Transaccion),
    foreign key (NumCuenta) references Cuenta(NumCuenta)
);

create table Prestamo(
    id_Prestamo int not null,
    Nombre varbinary(50) not null,
    Importe double not null,
    Motivo varchar(100) not null,
    RFC varchar(13) not null,
    primary key (id_Prestamo),
    foreign key (RFC) references Cliente(RFC)
);

create table Pago(
    id_Pago int not null,
    Fecha_pago datetime not null,
    Importe double not null,
    id_Prestamo int not null,
    primary key (id_Pago),
    foreign key (id_Prestamo) references Prestamo(id_Prestamo)
);

alter table Cuenta add column Num_tarjeta int(16) not null;