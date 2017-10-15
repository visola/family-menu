package com.github.visola.familymenu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.visola.familymenu.model.Person;

public interface PersonRepository extends PagingAndSortingRepository<Person, Integer> {

    Page<Person> findByFamilyNameOrderByName(Pageable pageRequest, String familyName);

}
