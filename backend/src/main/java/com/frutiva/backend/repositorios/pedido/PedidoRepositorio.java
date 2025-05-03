package com.frutiva.backend.repositorios.pedido;

import com.frutiva.backend.modelos.pedido.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {
}
