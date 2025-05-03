package com.frutiva.backend.repositorios.producto;

import com.frutiva.backend.modelos.producto.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductoRepositorio extends JpaRepository<Producto, Long>, 
                                             JpaSpecificationExecutor<Producto> {
}
