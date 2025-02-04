package org.tools.mysystem.service.app.utils;

public interface CallbackData {

    void onCompleteGraph(String id, String style);

    void onCompleteNode(String id, String label, int x, int y, String alias, String group, String tag, String cdata);

    void onCompleteEdge(String id, String label, String source, String target, String tag);
}
