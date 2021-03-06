package com.github.visola.familymenu.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.visola.familymenu.model.Family;

public interface FamilyRepository extends PagingAndSortingRepository<Family, Integer> {

    Family findByEmail(String emailOrFamilyName);

    Family findByName(String name);

}
