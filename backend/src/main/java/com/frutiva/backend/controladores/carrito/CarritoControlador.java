package com.frutiva.backend.controladores.carrito;

import java.util.List;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.frutiva.backend.dtos.carrito.CarritoDTO;
import com.frutiva.backend.dtos.carrito.ItemCarritoDTO;
import com.frutiva.backend.servicios.carrito.CarritoServicio;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/carritos")
@RequiredArgsConstructor
public class CarritoControlador {

    private final CarritoServicio servicio;

    @GetMapping
    public ResponseEntity<List<CarritoDTO>> listar(Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(servicio.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarritoDTO> getById(@PathVariable Long id, Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CarritoDTO> crear(@RequestBody CarritoDTO dto, Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        CarritoDTO creado = servicio.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarritoDTO> actualizar(@PathVariable Long id,
                                                 @RequestBody CarritoDTO dto,
                                                 Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return servicio.actualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        servicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<ItemCarritoDTO> addItem(@PathVariable Long id,
                                                  @RequestBody ItemCarritoDTO itemDto,
                                                  Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        ItemCarritoDTO agregado = servicio.addItem(id, itemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(agregado);
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id,
                                           @PathVariable Long itemId,
                                           Authentication auth) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        servicio.removeItem(id, itemId);
        return ResponseEntity.noContent().build();
    }
}

