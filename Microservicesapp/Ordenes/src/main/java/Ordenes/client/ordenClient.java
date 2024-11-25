package Ordenes.client;

import Ordenes.dto.ordenDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


public interface ordenClient {

    @GetMapping("/search-by-client/{IdClient]")
    List<ordenDTO> findAllOrderByClient(@PathVariable Long IdClient);
}
