package com.frutiva.backend.repositorios.carrito;

import com.frutiva.backend.modelos.carrito.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepositorio extends JpaRepository<Carrito, Long> { }
