package com.frutiva.backend.servicios.producto;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.regex.Pattern;
import jakarta.persistence.criteria.Expression;


import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.frutiva.backend.dtos.producto.ProductoDTO; // Update to the correct package path
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.modelos.producto.Producto;
import com.frutiva.backend.modelos.usuario.Usuario;
import com.frutiva.backend.repositorios.producto.ProductoRepositorio;
import com.frutiva.backend.repositorios.usuario.UsuarioRepositorio;

import org.modelmapper.ModelMapper;

@Service
public class ProductoServicio {
    private final ModelMapper modelMapper = new ModelMapper();
    private final UsuarioRepositorio usuarioRepo;
    private final ProductoRepositorio repo;


    public ProductoServicio(ProductoRepositorio repo, UsuarioRepositorio usuarioRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
    }

    public List<Producto> listarTodos() {
        return repo.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public ProductoDTO crear(ProductoDTO p) {
        Long vendedorId = p.getVendedor().getId();
        if (!usuarioRepo.existsById(vendedorId)) {
            throw new IllegalArgumentException("Vendedor con ID " + vendedorId + " no existe");
        }

        Producto producto = convertToEntity(p);
        producto.setVendedor(usuarioRepo.getById(vendedorId)); 

        Producto propiedadnueva = repo.save(producto);
        return convertToDto(propiedadnueva); 
    }

    public Optional<ProductoDTO> actualizar(Long id, ProductoDTO cambios) {
        return repo.findById(id).map(orig -> {
            Long vendedorId = cambios.getVendedor().getId();
            if (!usuarioRepo.existsById(vendedorId)) {
                throw new IllegalArgumentException("Vendedor con ID " + vendedorId + " no existe");
            }
    
            Usuario vendedor = usuarioRepo.getById(vendedorId);
    
            orig.setSku(cambios.getSku());
            orig.setNombre(cambios.getNombre());
            orig.setMarca(cambios.getMarca());
            orig.setModelo(cambios.getModelo());
            orig.setCategoria(cambios.getCategoria());
            orig.setVendedor(vendedor);
            orig.setStock(cambios.getStock());
            orig.setDescripcion(cambios.getDescripcion());
            orig.setPesoNeto(cambios.getPesoNeto());
            orig.setPesoBruto(cambios.getPesoBruto());
            orig.setLargo(cambios.getLargo());
            orig.setAncho(cambios.getAncho());
            orig.setAlto(cambios.getAlto());
            orig.setColor(cambios.getColor());
            orig.setMaterial(cambios.getMaterial());
            orig.setFechaFabricacion(cambios.getFechaFabricacion());
            orig.setFechaCaducidad(cambios.getFechaCaducidad());
            orig.setOrigen(cambios.getOrigen());
            orig.setProveedor(cambios.getProveedor());
            orig.setGarantia(cambios.getGarantia());
            orig.setPrecioUnitario(cambios.getPrecioUnitario());
            orig.setCantidadMinima(cambios.getCantidadMinima());
            orig.setPrecioPorMayor(cambios.getPrecioPorMayor());
            orig.setUnidadesPorPaquete(cambios.getUnidadesPorPaquete());
            orig.setTipoEmpaque(cambios.getTipoEmpaque());
            orig.setNumeroLote(cambios.getNumeroLote());
            orig.setDescuentoPorcentaje(cambios.getDescuentoPorcentaje());
    
            Producto actualizado = repo.save(orig);
            return convertToDto(actualizado);
        });
    }
    
    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    private Producto convertToEntity(ProductoDTO productoDTO) {
        return modelMapper.map(productoDTO, Producto.class);
    }

    private ProductoDTO convertToDto(Producto producto) {
        ProductoDTO dto = modelMapper.map(producto, ProductoDTO.class);
        dto.setVendedor(convertirAUsuarioAuxDTO(producto.getVendedor())); 
        return dto;
    }

    private UsuarioAuxDTO convertirAUsuarioAuxDTO(Usuario usuario) {
        UsuarioAuxDTO usuarioAuxDTO = new UsuarioAuxDTO();
        usuarioAuxDTO.setId(usuario.getId());
        usuarioAuxDTO.setNombre(usuario.getNombre());
        usuarioAuxDTO.setApellido(usuario.getApellido());
        usuarioAuxDTO.setCorreo(usuario.getCorreo());
        usuarioAuxDTO.setEdad(usuario.getEdad());
        return usuarioAuxDTO;
    }

    public List<ProductoDTO> listarTodosDTO() {
        return repo.findAll().stream()
                .map(this::convertToDto)
                .toList();
    }
    
    public Optional<ProductoDTO> obtenerPorIdDTO(Long id) {
        return repo.findById(id).map(this::convertToDto);
    }

 
  
    public List<ProductoDTO> filtrar(
            String sku,
            String nombre,
            String marca,
            String modelo,
            String categoria,
            Long stock,
            String descripcion,
            Double pesoNeto,
            Double pesoBruto,
            Double largo,
            Double ancho,
            Double alto,
            String color,
            String material,
            LocalDate fechaFabricacion,
            LocalDate fechaCaducidad,
            String origen,
            String proveedor,
            Integer garantia,
            Double precioMinimo,
            Double precioMaximo,
            Integer cantidadMinima,
            Double precioPorMayor,
            Integer unidadesPorPaquete,
            String tipoEmpaque,
            String numeroLote,
            Integer descuentoPorcentaje
    ) {
        Specification<Producto> spec = Specification.where(null);

        // SKU (case‐ & accent‐insensitive LIKE)
        if (sku != null && !sku.isBlank()) {
            String norm = normalize(sku).toLowerCase();
            spec = spec.and((root, query, cb) -> {
                Expression<String> db = cb.function(
                    "unaccent", String.class,
                    cb.lower(root.get("sku"))
                );
                return cb.like(db, "%" + norm + "%");
            });
        }

        // Nombre (case‐ & accent‐insensitive LIKE)
        if (nombre != null && !nombre.isBlank()) {
            String norm = normalize(nombre).toLowerCase();
            spec = spec.and((root, query, cb) -> {
                Expression<String> db = cb.function(
                    "unaccent", String.class,
                    cb.lower(root.get("nombre"))
                );
                return cb.like(db, "%" + norm + "%");
            });
        }

        // Marca (case‐ & accent‐insensitive LIKE)
        if (marca != null && !marca.isBlank()) {
            String norm = normalize(marca).toLowerCase();
            spec = spec.and((root, query, cb) -> {
                Expression<String> db = cb.function(
                    "unaccent", String.class,
                    cb.lower(root.get("marca"))
                );
                return cb.like(db, "%" + norm + "%");
            });
        }

        // Modelo (simple LIKE)
        if (modelo != null && !modelo.isBlank()) {
            spec = spec.and((r, q, cb) -> 
                cb.like(r.get("modelo"), "%" + modelo + "%")
            );
        }

        // Categoría (case‐ & accent‐insensitive equality)
        if (categoria != null && !categoria.isBlank()) {
            String norm = normalize(categoria).toLowerCase();
            spec = spec.and((root, query, cb) -> {
                Expression<String> db = cb.function(
                    "unaccent", String.class,
                    cb.lower(root.get("categoria"))
                );
                return cb.equal(db, norm);
            });
        }

        // Descripción (simple LIKE)
        if (descripcion != null && !descripcion.isBlank()) {
            spec = spec.and((r, q, cb) -> 
                cb.like(r.get("descripcion"), "%" + descripcion + "%")
            );
        }

        // Rangos y exactitudes
        if (stock != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("stock"), stock));
        }
        if (pesoNeto != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("pesoNeto"), pesoNeto));
        }
        if (pesoBruto != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("pesoBruto"), pesoBruto));
        }
        if (largo != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("largo"), largo));
        }
        if (ancho != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("ancho"), ancho));
        }
        if (alto != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("alto"), alto));
        }
        if (fechaFabricacion != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("fechaFabricacion"), fechaFabricacion));
        }
        if (fechaCaducidad != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("fechaCaducidad"), fechaCaducidad));
        }
        if (origen != null && !origen.isBlank()) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("origen"), origen));
        }
        if (proveedor != null && !proveedor.isBlank()) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("proveedor"), proveedor));
        }
        if (garantia != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("garantia"), garantia));
        }

        // Precio unitario en rango [min, max]
        if (precioMinimo != null) {
            spec = spec.and((r, q, cb) -> 
                cb.greaterThanOrEqualTo(r.get("precioUnitario"), precioMinimo)
            );
        }
        if (precioMaximo != null) {
            spec = spec.and((r, q, cb) -> 
                cb.lessThanOrEqualTo(r.get("precioUnitario"), precioMaximo)
            );
        }

        if (cantidadMinima != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("cantidadMinima"), cantidadMinima));
        }
        if (precioPorMayor != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("precioPorMayor"), precioPorMayor));
        }
        if (unidadesPorPaquete != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("unidadesPorPaquete"), unidadesPorPaquete));
        }
        if (tipoEmpaque != null && !tipoEmpaque.isBlank()) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("tipoEmpaque"), tipoEmpaque));
        }
        if (numeroLote != null && !numeroLote.isBlank()) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("numeroLote"), numeroLote));
        }
        if (descuentoPorcentaje != null) {
            spec = spec.and((r, q, cb) -> cb.equal(r.get("descuentoPorcentaje"), descuentoPorcentaje));
        }

        return repo.findAll(spec).stream()
                   .map(this::convertToDto)
                   .collect(Collectors.toList());
    }

    private static String normalize(String input) {
        String nfd = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfd).replaceAll("");
    }
    
}
