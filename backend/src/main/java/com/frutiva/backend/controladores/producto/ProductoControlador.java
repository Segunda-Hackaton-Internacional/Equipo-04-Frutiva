// controladores/producto/ProductoControlador.java
package com.frutiva.backend.controladores.producto;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.frutiva.backend.dtos.producto.ProductoDTO;
import com.frutiva.backend.servicios.producto.ProductoServicio;

@RestController
@RequestMapping("/api/productos")
public class ProductoControlador {

    private final ProductoServicio productoServicio;

    @Autowired
    public ProductoControlador(ProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ProductoDTO>> listar(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(productoServicio.listarTodosDTO());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id,
                                                    Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return productoServicio.obtenerPorIdDTO(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    

    
    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody ProductoDTO productoDTO, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        ProductoDTO creado = productoServicio.crear(productoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id,
                                                  @RequestBody ProductoDTO productoDTO,
                                                  Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return productoServicio.actualizar(id, productoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        productoServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProductoDTO>> filtrar(
        @RequestParam(required = false) String sku,
        @RequestParam(required = false) String nombre,
        @RequestParam(required = false) String marca,
        @RequestParam(required = false) String modelo,
        @RequestParam(required = false) String categoria,
        @RequestParam(required = false) Long stock,
        @RequestParam(required = false) String descripcion,
        @RequestParam(required = false) Double pesoNeto,
        @RequestParam(required = false) Double pesoBruto,
        @RequestParam(required = false) Double largo,
        @RequestParam(required = false) Double ancho,
        @RequestParam(required = false) Double alto,
        @RequestParam(required = false) String color,
        @RequestParam(required = false) String material,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFabricacion,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaCaducidad,
        @RequestParam(required = false) String origen,
        @RequestParam(required = false) String proveedor,
        @RequestParam(required = false) Integer garantia,
        @RequestParam(required = false) Double precioUnitario,
        @RequestParam(required = false) Double precioMinimo,
        @RequestParam(required = false) Double precioMaximo,
        @RequestParam(required = false) Integer cantidadMinima,
        @RequestParam(required = false) Double precioPorMayor,
        @RequestParam(required = false) Integer unidadesPorPaquete,
        @RequestParam(required = false) String tipoEmpaque,
        @RequestParam(required = false) String numeroLote,
        @RequestParam(required = false) Integer descuentoPorcentaje,
        Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    
        List<ProductoDTO> resultados = productoServicio.filtrar(
            sku, nombre, marca, modelo, categoria,
            stock, descripcion, pesoNeto, pesoBruto,
            largo, ancho, alto, color, material,
            fechaFabricacion, fechaCaducidad,
            origen, proveedor, garantia,
             precioMinimo, precioMaximo,
            cantidadMinima, precioPorMayor,
            unidadesPorPaquete, tipoEmpaque,
            numeroLote, descuentoPorcentaje
        );
        return ResponseEntity.ok(resultados);
    }
    
}
