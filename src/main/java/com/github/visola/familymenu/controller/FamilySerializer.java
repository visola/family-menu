package com.github.visola.familymenu.controller;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.github.visola.familymenu.model.Family;

public class FamilySerializer extends StdSerializer<Family> {

    private static final long serialVersionUID = 1L;

    public FamilySerializer() {
        this(null);
    }

    protected FamilySerializer(Class<Family> t) {
        super(t);
    }

    @Override
    public void serialize(Family value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", value.getId());
        gen.writeStringField("name", value.getName());
        gen.writeStringField("email", value.getEmail());
        gen.writeEndObject();
    }

}
