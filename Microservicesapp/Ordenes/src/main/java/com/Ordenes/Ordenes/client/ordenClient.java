package com.Ordenes.Ordenes.client;

import com.Ordenes.Ordenes.dto.ordenDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "msvc-clientes", url = "localhost:<port>/api/client")
public interface ordenClient {

    @GetMapping("/search-by-client/{IdClient]")
    List<ordenDTO> findAllOrderByClient(@PathVariable Long IdClient);
}
