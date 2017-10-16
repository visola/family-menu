package com.github.visola.familymenu.model;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FamilyTest {

    private ObjectMapper objectMapper;

    @Before
    public void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    public void doNotSerializePassword() throws IOException {
        Family family = new Family();
        family.setId(1);
        family.setName("Test");
        family.setEmail("test@test.com");
        family.setPassword("password");

        String json = objectMapper.writeValueAsString(family);
        JsonNode jsonNode = objectMapper.readTree(json);
        Assert.assertFalse("Should not have serialized password", jsonNode.has("password"));

        Assert.assertSame("Should serialize id correctly", family.getId(), jsonNode.get("id").asInt());
        Assert.assertEquals("Should serialize name correctly", family.getName(), jsonNode.get("name").asText());
        Assert.assertEquals("Should serialize email correctly", family.getEmail(), jsonNode.get("email").asText());
    }

}
