package com.frutiva.backend.repositorios.carrito;

import com.frutiva.backend.modelos.carrito.ItemCarrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCarritoRepositorio extends JpaRepository<ItemCarrito, Long> { }
