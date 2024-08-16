---
title: jackson反序列化器获取类型
date: 2023-01-12 21:58:58
tags: java
---

> 不要用陌生人的目光来看你所爱的人，也不要认为自己做出了牺牲——贝·列昂尼多娃

例如这里使用`hutool`的`EnumUtil.getEnumAt`传入枚举的`ordinal`，以及枚举类型，获取到具体的枚举常量值

```java
import cn.hutool.core.util.EnumUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;

import java.io.IOException;

/**
 * @author VampireAchao
 * @since 2023/1/12 15:46
 */
public class EnumOrdinalDeSerializer<E extends Enum<E>> extends JsonDeserializer<E> implements ContextualDeserializer {

    private JavaType type;

    public EnumOrdinalDeSerializer() {
    }

    public EnumOrdinalDeSerializer(JavaType type) {
        this.type = type;
    }


    /**
     * Method that can be called to ask implementation to deserialize
     * JSON content into the value type this serializer handles.
     * Returned instance is to be constructed by method itself.
     * <p>
     * Pre-condition for this method is that the parser points to the
     * first event that is part of value to deserializer (and which
     * is never JSON 'null' literal, more on this below): for simple
     * types it may be the only value; and for structured types the
     * Object start marker or a FIELD_NAME.
     * </p>
     * <p>
     * The two possible input conditions for structured types result
     * from polymorphism via fields. In the ordinary case, Jackson
     * calls this method when it has encountered an OBJECT_START,
     * and the method implementation must advance to the next token to
     * see the first field name. If the application configures
     * polymorphism via a field, then the object looks like the following.
     * <pre>
     *      {
     *          "@class": "class name",
     *          ...
     *      }
     *  </pre>
     * Jackson consumes the two tokens (the <tt>@class</tt> field name
     * and its value) in order to learn the class and select the deserializer.
     * Thus, the stream is pointing to the FIELD_NAME for the first field
     * after the @class. Thus, if you want your method to work correctly
     * both with and without polymorphism, you must begin your method with:
     * <pre>
     *       if (p.currentToken() == JsonToken.START_OBJECT) {
     *         p.nextToken();
     *       }
     *  </pre>
     * This results in the stream pointing to the field name, so that
     * the two conditions align.
     * <p>
     * Post-condition is that the parser will point to the last
     * event that is part of deserialized value (or in case deserialization
     * fails, event that was not recognized or usable, which may be
     * the same event as the one it pointed to upon call).
     * <p>
     * Note that this method is never called for JSON null literal,
     * and thus deserializers need (and should) not check for it.
     *
     * @param p    Parsed used for reading JSON content
     * @param ctxt Context that can be used to access information about
     *             this deserialization activity.
     * @return Deserialized value
     */
    @Override
    public E deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        return EnumUtil.getEnumAt((Class<E>) type.getRawClass(), p.getValueAsInt());
    }

    /**
     * Method called to see if a different (or differently configured) deserializer
     * is needed to deserialize values of specified property.
     * Note that instance that this method is called on is typically shared one and
     * as a result method should <b>NOT</b> modify this instance but rather construct
     * and return a new instance. This instance should only be returned as-is, in case
     * it is already suitable for use.
     *
     * @param ctxt     Deserialization context to access configuration, additional
     *                 deserializers that may be needed by this deserializer
     * @param property Method, field or constructor parameter that represents the property
     *                 (and is used to assign deserialized value).
     *                 Should be available; but there may be cases where caller cannot provide it and
     *                 null is passed instead (in which case impls usually pass 'this' deserializer as is)
     * @return Deserializer to use for deserializing values of specified property;
     * may be this instance or a new instance.
     * @throws JsonMappingException
     */
    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty property) throws JsonMappingException {
        //beanProperty is null when the type to deserialize is the top-level type or a generic type, not a type of a bean property
        JavaType type = ctxt.getContextualType() != null
                ? ctxt.getContextualType()
                : property.getMember().getType();
        return new EnumOrdinalDeSerializer<>(type);
    }
}

```

使用：

```java
class Entity{
    @JsonDeserialize(using = EnumOrdinalDeSerializer.class)
    private MyEnum myEnum;
}
```

